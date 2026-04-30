import placeholder from '../assets/images/placeholderImage2.jpg';
import type { ImageComponentProps } from '../constants/types';

const ImageComponent = ({
  imageObj,
  imageStyle,
  imageContainerStyle,
}: ImageComponentProps) => {
  console.log('SRC:', imageObj?.src);
  return (
    <div
      style={
        typeof imageContainerStyle === 'object'
          ? imageContainerStyle
          : undefined
      }
      className={
        typeof imageContainerStyle === 'string'
          ? imageContainerStyle
          : undefined
      }
    >
      <img
        className={typeof imageStyle === 'string' ? imageStyle : undefined}
        style={typeof imageStyle === 'object' ? imageStyle : undefined}
        src={imageObj?.src ? imageObj.src : placeholder}
        alt={imageObj?.alt}
      />
    </div>
  );
};

export default ImageComponent;
