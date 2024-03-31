/*
 * 샘플 API용 타입정의
 */
export interface SampleFolder {
  folder?: SampleFolderInfo;
}

export interface SampleFolderInfo {
  count: number;
  id: number;
  links: SampleLink[]; // Link Type으로 변경
  name: string;
  owner: SampleOwner;
}

export interface SampleOwner {
  id: number;
  name: string;
  profileImageSource: string;
}

export interface SampleLink {
  createdAt: string;
  description: string;
  id: number;
  imageSource: string;
  title: string;
  url: string;
}

export interface LinkList {
  data?: LinkItem[];
}

export interface LinkItem {
  id: number;
  created_at: string;
  updated_at?: string;
  url: string;
  title?: string;
  description?: string;
  image_source?: string;
  folder_id?: number;
}

export interface FolderList {
  data?: FolderItem[];
}

export interface FolderItem {
  id: number;
  created_at: string;
  name: string;
  user_id: number;
  favorite: boolean;
  link: {
    count: number;
  };
}

export interface OwnerList {
  data?: OwnerInfo[];
}

export interface OwnerInfo {
  id: number;
  created_at: string;
  name: string;
  image_source: string;
  email: string;
  auth_id: string;
}
