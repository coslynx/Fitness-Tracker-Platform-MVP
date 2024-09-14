import { isEmail } from "validator";

export const validateEmail = (email: string): boolean => {
  return isEmail(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateGoalTitle = (title: string): boolean => {
  return title.length > 0 && title.length <= 50;
};

export const validateGoalTarget = (target: string): boolean => {
  return target.length > 0 && !isNaN(parseInt(target));
};

export const validateActivityLogDescription = (
  description: string
): boolean => {
  return description.length > 0 && description.length <= 250;
};