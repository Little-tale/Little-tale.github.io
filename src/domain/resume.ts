export type ResumeEntry = {
  title: string;
  meta?: string;
  body: string;
};

export type WorkEntry = {
  company: string;
  role: string;
  period: string;
  body: string;
};

export type LeadershipEntry = WorkEntry;

export type EducationEntry = {
  school: string;
  major: string;
  period: string;
  note: string;
};

export type ActivityEntry = {
  name: string;
  role: string;
  body: string;
};

export type AwardEntry = {
  title: string;
  date: string;
  body: string;
};

export type CertificateEntry = {
  title: string;
  date: string;
  body: string;
};

export type Resume = {
  work: readonly WorkEntry[];
  leadership: readonly LeadershipEntry[];
  education: readonly EducationEntry[];
  activities: readonly ActivityEntry[];
  awards: readonly AwardEntry[];
  certificates: readonly CertificateEntry[];
};
