import { useParams } from 'react-router-dom';
import SingleTaxLawComponent from '../../../../components/TaxLaw/SingleTaxLawComponent';

const SingleTaxLaw = () => {
  const { taxLawId } = useParams();

  if (!taxLawId) {
    return;
  }

  return <SingleTaxLawComponent id={taxLawId} />;
};

export default SingleTaxLaw;
