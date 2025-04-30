import { createContext, ReactNode, useReducer, useState } from "react";
import { Cycle, cycleReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/action";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCycle: () => void;
}

interface CyclesContextProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CyclesContext = createContext({} as CyclesContextType);

//------------------------------------------------------------------------------

export function CyclesContextProvider({ children } : CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cycleReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);
  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cyclesState.cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }
  
  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()), 
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle)); 

    setAmountSecondsPassed(0); 
  }

  function interruptCycle() {
    dispatch(interruptCurrentCycleAction()); 
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
  
  
}