export interface IAppHandler {
  getPostsFilteredByHandler: (filter: string) => Promise<IPostObject[]>;
  getPostsByTagsHandler: (tags: string[]) => Promise<IPostObject[]>;
  getLatestPostsHandler: () => Promise<IPostObject[]>;
  getFavPostsHandler: () => Promise<IPostObject[]>;
  getTagsHandler: () => Promise<string[]>;
  searchPostsHandler: (query: string) => Promise<IPostObject[]>;
  suscribeUserHandler: (user: string) => Promise<void>;
  submitPostHandler: (link: string) => Promise<void>;
  favoritePostHandler: (post: number) => Promise<void>;
  unFavoritePostHandler: (post: number) => Promise<void>;
  loginHandler: (email: string, password: string) => Promise<IUser>;
  signinHandler: (email: string, password: string) => Promise<void>;
  nextPageHandler: (page: number) => Promise<IPostObject[]>;
}

export interface IAppProps {
  handler: IAppHandler;
}

export interface IHeaderProps {
}

export interface ISidebarProps {
  handleSubmitPost: (link: string) => void;
  handleLatestPosts: () => void;
  handleFavPosts: () => void;
  loginHandler: (email: string, password: string) => Promise<void>;
  signinHandler: (email: string, password: string) => Promise<void>;
}

export interface INewPostModalProps {
  visible: boolean;
  onCancelHandler: () => void;
  onOkHandler: (link: string) => void;
}
export interface IAboutModalProps {
  visible: boolean;
  onCancelHandler: () => void;
}

export interface IUserModalProps {
  visible: boolean;
  onCancel: () => void;
  loginHandler: (email: string, password: string) => Promise<void>;
  signinHandler: (email: string, password: string) => Promise<void>;
}

export interface ITopMenuProps {
  handleSearchPosts: (query: string) => void;
  handlePostsByTags: (tags: string[]) => void;
  handleFilterPosts: (filter: string) => void;
  tags: string[];
}

export interface ITopTagsProps {
  handlePostsByTags: (tags: string[]) => void;
  tags: string[]
}

export interface IPostObject {
  id: number;
  link: string;
  title: string;
  authorName: string;
  authorLink: string;
  date: string;
  tags: string[];
  imageUrl: string;
  favorited: boolean;
}

export interface IPostListProps {
  posts: IPostObject[];
  favoritePostHandler: (id: number) => void;
  unFavoritePostHandler: (id: number) => void;
}

export interface IPostProps extends IPostObject{
  favoritePostHandler: (id: number) => void;
  unFavoritePostHandler: (id: number) => void;
}

export interface INormalLoginFormProps {
  onCancel: () => void;
  loginHandler: (email: string, password: string) => Promise<void>;
}

export interface IUser {
  token: string;
  email: string;
}

export interface IRegistrationFormProps {
  onCancel: () => void;
  signinHandler: (email: string, password: string) => Promise<void>;
}
