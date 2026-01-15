export interface PolicySection {
  id: string;
  title: string;
  content: string[];
  lastUpdated: string;
}

export interface Policy {
  id: string;
  title: string;
  description: string;
  sections: PolicySection[];
}
