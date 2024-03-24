export interface folderType {
  folder?: folderInfoType;
}

export interface folderInfoType {
  count: number;
  id: number;
  links: linkType[]; // Link Type으로 변경
  name: string;
  owner: ownerType;
}

export interface ownerType {
  id: number;
  name: string;
  profileImageSource: string;
}

export interface linkType {
  createdAt: string;
  description: string;
  id: number;
  imageSource: string;
  title: string;
  url: string;
}

export interface LinkListType {
  data?: LinkType[];
}

export interface LinkType {
  id: number;
  created_at: string;
  updated_at?: string;
  url: string;
  title?: string;
  description?: string;
  image_source?: string;
  folder_id?: number;
}

export interface FolderListType {
  data?: FolderType[];
}

export interface FolderType {
  id: number;
  created_at: string;
  name: string;
  user_id: number;
  favorite: boolean;
  link: {
    count: number;
  };
}

export interface OwnerListType {
  data?: OwnerType[];
}

export interface OwnerType {
  id: number;
  created_at: string;
  name: string;
  image_source: string;
  email: string;
  auth_id: string;
}
