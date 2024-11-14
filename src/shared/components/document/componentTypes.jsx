// componentTypes.js
// Importer tous les composants nécessaires

// Composants pour les articles
import HeadingLevel1 from "../../../core/Article/ArticlesDynamic/ArticleComponentsType/HeadingLevel1";
import HeadingLevel2 from "../../../core/Article/ArticlesDynamic/ArticleComponentsType/HeadingLevel2";
import Paragraph from "../../../core/Article/ArticlesDynamic/ArticleComponentsType/Paragraph";
import Quote from "../../../core/Article/ArticlesDynamic/ArticleComponentsType/Quote";
import ImageComponent from "../../../core/Article/ArticlesDynamic/ArticleComponentsType/ImageComponent";
import ListComponent from "../../../core/Article/ArticlesDynamic/ArticleComponentsType/ListComponent";

// Composants pour les surveys
import MultipleChoiceQuestion from "../../../core/Survey/SurveyDynamic/SurveyComponentsType/MultipleChoiceQuestion";
import ShortAnswerQuestion from "../../../core/Survey/SurveyDynamic/SurveyComponentsType/ShortAnswerQuestion";
import DateQuestion from "../../../core/Survey/SurveyDynamic/SurveyComponentsType/DateQuestion";
import TimeQuestion from "../../../core/Survey/SurveyDynamic/SurveyComponentsType/TimeQuestion";

// Mapping des types pour les articles
export const articleComponentTypes = [
  { label: "Heading 1", value: "heading1" },
  { label: "Heading 2", value: "heading2" },
  { label: "Paragraph", value: "paragraph" },
  { label: "Quote", value: "quote" },
  { label: "Image", value: "image" },
  { label: "List", value: "list" },
];

// Mapping des types pour les surveys
export const surveyComponentTypes = [
  { label: "Multiple Choice", value: "multiple-choice" },
  { label: "Short Answer", value: "short-answer" },
  { label: "Date", value: "date" },
  { label: "Time", value: "time" },
];

// Mapping global des types vers les composants
const componentTypes = {
  // Articles
  heading1: HeadingLevel1,
  heading2: HeadingLevel2,
  paragraph: Paragraph,
  quote: Quote,
  image: ImageComponent,
  list: ListComponent,
  // Surveys
  "multiple-choice": MultipleChoiceQuestion,
  "short-answer": ShortAnswerQuestion,
  date: DateQuestion,
  time: TimeQuestion,
};

export default componentTypes;
