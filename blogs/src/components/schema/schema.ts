interface Message {
  id: number;
  sender: string;
  category: string;
  title: string;
  shortDescription: string;
  content: string;
  timestamp: any;
  replies: number;
  views: number;
  imageURL?: string;
  URL?: string;
}

export default Message;

interface Project {
    URL?: string;
    title: string;
    repository?: string;

    shortDescription: string;
    content: string;
    views: number;
    category: string;
    imageURL?: string;
}

export type { Project };
