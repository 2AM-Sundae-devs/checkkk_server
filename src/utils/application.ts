export const createResponseApplication = ({
  id,
  situation,
  companyAddress,
  positionExperience,
  companyName,
  apply,
  personalOpinion,
  position,
}: any) => ({
  index: id,
  companyName,
  position,
  situation,
  positionExperience,
  companyAddress,
  apply,
  personalOpinion,
});
