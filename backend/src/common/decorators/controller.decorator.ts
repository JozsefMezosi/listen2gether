import { NextFunction, Request, Response } from 'express';

export const Controller = (target: { prototype: object }) => {
  const prototype = target.prototype;
  for (const propertyName of Reflect.ownKeys(prototype).filter((prop) => prop !== 'constructor')) {
    const desc = Object.getOwnPropertyDescriptor(prototype, propertyName);
    if (!desc) continue;

    const isMethod = desc.value instanceof Function;

    if (!isMethod) continue;
    Object.defineProperty(prototype, propertyName, handleErrorInMethod(desc));
  }
};
const handleErrorInMethod = (descriptor: PropertyDescriptor) => {
  const childFunction = descriptor.value;
  descriptor.value = async function (...args: [Request, Response, NextFunction]) {
    const next = args[2];
    try {
      return await childFunction.apply(this, args);
    } catch (error) {
      next(error);
    }
  };

  return descriptor;
};
