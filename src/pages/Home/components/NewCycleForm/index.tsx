import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../..";
import { useContext } from "react";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext(); 

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para a sua tarefa"
        disabled={!!activeCycle}
        {...register("task")}
      />
      <datalist id="task-suggestions">
        <option value="Tarefa 1" />
        <option value="Tarefa 2" />
        <option value="Tarefa 3" />
      </datalist>
      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        step={5}
        min={1}
        max={90}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  );
}