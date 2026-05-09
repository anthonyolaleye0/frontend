const LoginButtonStyle = `text-white cursor-pointer font-bold uppercase p-2`;
const LoginButtonContainerStyle = `mt-4 rounded-md bg-secondary text-center cursor-pointer`;
const profileImageStyle =
  'w-[200px] h-[200px] rounded-full md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] mt-5';

const profileImageContainerStyle = 'flex flex-col items-center mb-4';
const navbarImageStyle = 'w-8 h-8 rounded-full';
const emailVerificationStyle = `${LoginButtonContainerStyle} w-70`;

const modalGeneralStyle = `bg-gray-50 border border-gray-400 mb-20 p-3 rounded-lg shadow-xl max-w-lg w-full mx-2 md:mx-auto mt-10 outline-none`;

const updateChapterModalStyle = `${modalGeneralStyle} !w-[100%]`;

export {
  emailVerificationStyle,
  LoginButtonContainerStyle,
  LoginButtonStyle,
  navbarImageStyle,
  profileImageContainerStyle,
  profileImageStyle,
  updateChapterModalStyle,
};
