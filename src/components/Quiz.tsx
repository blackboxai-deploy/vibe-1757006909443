"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import questions from "@/data/questions.json";

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackColor, setFeedbackColor] = useState<string>("");
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (option: string) => {
    setSelectedOption(option);
    const isCorrect = option === currentQuestion.correctAnswer;

    if (isCorrect) {
      setFeedback("Correct! Moving to next level.");
      setFeedbackColor("text-green-600");
      setScore(score + 1);
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption(null);
          setFeedback("");
        } else {
          setQuizCompleted(true);
        }
      }, 2000);
    } else {
      setFeedback("Incorrect. Try Again.");
      setFeedbackColor("text-red-600");
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setFeedback("");
    setFeedbackColor("");
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Quiz Completed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg">Your Score: {score} / {questions.length}</p>
            <Button onClick={handleRestart} className="w-full">
              Restart Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Badge variant="outline">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>
            <span className="text-sm text-gray-500">Score: {score}</span>
          </div>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion.imageUrl && (
            <div className="w-full flex justify-center">
              <img
                src={currentQuestion.imageUrl}
                alt={`Reaction diagram for question ${currentQuestion.id}`}
                className="rounded-lg shadow-md max-h-64"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(currentQuestion.options).map(([key, value]) => (
              <Button
                key={key}
                variant={selectedOption === key ? "default" : "outline"}
                onClick={() => !feedback && handleAnswerSelect(key)}
                disabled={!!feedback}
                className={`justify-start text-left h-auto whitespace-normal ${
                  selectedOption === key
                    ? selectedOption === currentQuestion.correctAnswer
                      ? "bg-green-500"
                      : "bg-red-500"
                    : ""
                }`}
              >
                <span className="font-semibold mr-2">({key})</span>
                <span>{value}</span>
              </Button>
            ))}
          </div>
          {feedback && (
            <p
              className={`text-center font-semibold text-lg mt-6 ${feedbackColor}`}
            >
              {feedback}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;