"use client"

import { createContext, useContext, useState } from "react";

import { TestResult } from "../types";

type TypeTestContextProps = {
  timer: number;
  correctWords: number;
  wrongWords: number;
  accuracy: number;
  wpm: number;
  isPlaying: boolean,
  currentWordIndex: number,
  isReady: boolean,
  userInput: string,
  results: TestResult[];
  isInTop10: boolean,
  setIsInTop10: React.Dispatch<React.SetStateAction<boolean>>;
  setResults: React.Dispatch<React.SetStateAction<TestResult[]>>;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  setCorrectWords: React.Dispatch<React.SetStateAction<number>>;
  setWrongWords: React.Dispatch<React.SetStateAction<number>>;
  setCurrentWordIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialContext: TypeTestContextProps = {
  timer: 0,
  correctWords: 0,
  wrongWords: 0,
  accuracy: 0,
  wpm: 0,
  isPlaying: false,
  isReady: true,
  currentWordIndex: 0,
  userInput: "",
  results: [],
  isInTop10: false,
  setIsInTop10: () => {},
  setResults: () => {},
  setUserInput: () => {},
  setIsPlaying: () => {},
  setTimer: () => {},
  setCorrectWords: () => {},
  setWrongWords: () => {},
  setCurrentWordIndex: () => {},
  setIsReady: () => {},
};

export const TypeTestContext = createContext<TypeTestContextProps>(initialContext);

export const TypeTestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timer, setTimer] = useState<number>(60);
  const [correctWords, setCorrectWords] = useState<number>(0);
  const [wrongWords, setWrongWords] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isReady, setIsReady] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState<TestResult[]>([]);
  const [isInTop10, setIsInTop10] = useState<boolean>(false);

  const accuracy = (correctWords / (wrongWords + correctWords)) * 100;
  const timeTakenMinutes = 60 / 60; 
  const wpm = (correctWords / timeTakenMinutes);

  return (
    <TypeTestContext.Provider
      value={{
        timer,
        correctWords,
        wrongWords,
        setIsPlaying,
        isPlaying,
        setTimer,
        setCorrectWords,
        setWrongWords,
        wpm,
        accuracy,
        currentWordIndex,
        setCurrentWordIndex,
        isReady,
        setIsReady,
        userInput, 
        setUserInput,
        results,
        setResults,
        isInTop10,
        setIsInTop10
      }}  
    >
      {children}
    </TypeTestContext.Provider>
  );
};

export const useTypeTestContext = (): TypeTestContextProps => useContext(TypeTestContext);
