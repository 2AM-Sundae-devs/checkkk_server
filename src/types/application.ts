export interface IApplication {
  index: string;
  companyName: string;
  position: string;
  situation: string;
  positionExperience: number;
  companyAddress: string;
  apply: {
    path: string;
    day: string;
    link: string;
  };
  personalOpinion: any[];
}
