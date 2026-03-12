import styled from "styled-components";

export const TaskContainer = styled.div`
  display: flex;
  block-size: 100%;
  gap: 1rem;
  padding: 1rem;
`;
export const TodoContainer = styled.div`
  border: 1px solid black;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  block-size: 100%;
  inline-size: 100%;
`;

export const ActionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export const DeleteButton = styled.button`
  display: flex;
  allign-items: center;
  justify-content: center;
`;
