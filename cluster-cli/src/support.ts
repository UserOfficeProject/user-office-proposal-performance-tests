import { AnswerKey } from './initValues';
import { Question } from './questions';

export async function processQuestions(
  questions: Question[]
): Promise<Record<AnswerKey, unknown>> {
  const answers: Record<string, unknown> = {};
  await questions.reduce(async (previousPromise, question) => {
    await previousPromise;
    try {
      if (question.dependencyPrompt) {
        if (answers[question.dependencyPrompt as AnswerKey]) {
          const answer = await prompt(question);
          answers[question.key as AnswerKey] = answer;
        }
      } else if (question.dependencyAnswer) {
        if (question.defaultCallBack) {
          const answer = await prompt({...question,options:{
            ...question.options,
            default: question.defaultCallBack(
              answers[question.dependencyAnswer as AnswerKey] as string
            ),
          }});
          answers[question.key as AnswerKey] = answer;
        } else {
          const answer = await prompt(question);
          answers[question.key as AnswerKey] = answer;
        }
      } else {
        const answer = await prompt(question);
        answers[question.key as AnswerKey] = answer;
      }

      return Promise.resolve();
    } catch (error) {
      console.error(`Error processing question ${question.key}:`, error);
      answers[question.key as AnswerKey] = null;
      return Promise.resolve();
    }
  }, Promise.resolve());

  return answers;
}

async function prompt(question: Question) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /// @ts-ignore  we do not have access to the types
  return await question.type({ ...question.options });
}
