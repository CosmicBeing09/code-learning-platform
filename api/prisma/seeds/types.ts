export interface TopicContentType {
  title: string;
  description: string;
  content: string;
  exercises: Array<{
    question: string;
    hints: string[];
    solution: string;
  }>;
}

export interface CourseContent {
  [key: string]: TopicContentType;
} 