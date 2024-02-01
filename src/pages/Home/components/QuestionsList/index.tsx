import React from 'react';
import Placeholder from 'shared/components/Placeholder';
import { useAppSelector } from 'shared/store/hooks';
import QuestionCard from 'shared/components/QuestionCard';
import './QuestionsList.css';
import { Question } from 'shared/types';

const mock = [
  {
    id: 'f0228844-db8d-422a-86d6-900b3f30fbe8',
    answer:
      'When you start using forwardRef in a component library, you should treat it as a breaking change and release a new major version of your library. This is because your library likely has a different behavior such as what refs get assigned to, and what types are exported. These changes can break apps and other libraries that depend on the old behavior.',
    question:
      'Why do you need additional care for component libraries while using forward refs?',
  },
  {
    id: '58006508-09d3-48ee-84c4-91ef15221a08',
    answer:
      'The major features of React are:\n\nUses JSX syntax, a syntax extension of JS that allows developers to write HTML in their JS code.\nIt uses Virtual DOM instead of Real DOM considering that Real DOM manipulations are expensive.\nSupports server-side rendering which is useful for Search Engine Optimizations(SEO).\nFollows Unidirectional or one-way data flow or data binding.\nUses reusable/composable UI components to develop the view.',
    question: 'What are the major features of React?',
  },
  {
    id: '7a5ff558-d1c4-4823-ac39-3b7c7680ab55',
    answer:
      'The history of ReactJS started in 2010 with the creation of XHP. XHP is a PHP extension which improved the syntax of the language such that XML document fragments become valid PHP expressions and the primary purpose was used to create custom and reusable HTML elements.\n\nThe main principle of this extension was to make front-end code easier to understand and to help avoid cross-site scripting attacks. The project was successful to prevent the malicious content submitted by the scrubbing user.\n\nBut there was a different problem with XHP in which dynamic web applications require many roundtrips to the server, and XHP did not solve this problem. Also, the whole UI was re-rendered for small change in the application. Later, the initial prototype of React is created with the name FaxJ by Jordan inspired from XHP. Finally after sometime React has been introduced as a new library into JavaScript world.\n\nNote: JSX comes from the idea of XHP',
    question: 'What is the history behind React evolution?',
  },
  {
    id: 'bd652628-dc16-4e64-b8c6-87702776d151',
    answer:
      'React(aka React.js or ReactJS) is an open-source front-end JavaScript library that is used for building composable user interfaces, especially for single-page applications. It is used for handling view layer for web and mobile apps based on components in a declarative approach.',
    question: 'What is React?',
  },
];
const QuestionsList = () => {
  const { questions } = useAppSelector((state) => state.questions);
  console.log('questions', questions);

  const handleEdit = (question: Question) => {
    console.log({ question });
  };

  const handleRemove = (id: string) => {
    console.log({ id });
  };

  return (
    <div className="questions-list">
      <div className="questions-list__header">
        <h1 className="questions-list__title">Created Questions</h1>
        <p className="questions-list__subtitle">
          Here you can find {questions.length}{' '}
          {questions.length === 1 ? 'question' : 'questions'}. Feel free to
          create your own questions
        </p>
      </div>

      <div className="questions-list__content">
        {!mock.length ? (
          <Placeholder message="No questions yet. Please add your first question" />
        ) : (
          mock.map((question) => (
            <QuestionCard
              question={question}
              key={question.id}
              onEdit={handleEdit}
              onRemove={handleRemove}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionsList;
