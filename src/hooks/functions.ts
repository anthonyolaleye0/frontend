const formatDate = (date = new Date()) => {
  const f_date = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const weekDayPrefix = f_date.split(' ')[0].substring(0, 3);
  const dateFormatted = `${weekDayPrefix}, ${f_date.split(',')[1]}, ${
    f_date.split(',')[2]
  }`;

  return dateFormatted;
};

const roleRedirectMap: Record<string, string> = {
  user: '/dashboard/user/overview',
  admin: '/dashboard/admin/overview',
};

const getNextAvailableColumnNumber = (used: number[]): number => {
  let i = 1;
  while (used.includes(i)) {
    i++;
  }
  return i;
};

const capitalizeFirstLetter = (payload: string | undefined): string => {
  if (!payload || typeof payload !== 'string') {
    return '';
  }

  if (payload.includes('-')) {
    return payload
      .split('-')
      .map((a) => capitalizeFirstLetter(a))
      .join('-');
  } else if (payload.includes(' ')) {
    return payload
      .split(' ')
      .map((a) => capitalizeFirstLetter(a))
      .join(' ');
  }
  return payload.charAt(0).toUpperCase() + payload.slice(1);
};

const formattedUserRole = (role: string) => {
  let splittedRole: string[] = [];
  if (role.includes('_')) {
    splittedRole = role.split('_');
  } else if (role.includes('-')) {
    splittedRole = role.split('-');
  } else {
    splittedRole = [role];
  }
  const firstPart = capitalizeFirstLetter(splittedRole[0]);
  const secondPart = splittedRole[1]
    ? capitalizeFirstLetter(splittedRole[1])
    : '';
  const newRole = `${firstPart} ${secondPart}`;
  return newRole;
};

const formatDateWithoutWeekDay = (date = new Date()) => {
  const value = formatDate(date);
  const splittedValue = value.split(',');
  const formatted = `${splittedValue[1]},${splittedValue[2]}`;
  return formatted;
};

const formattedUserRoleForURL = (role: string) => {
  const splittedRole = role.split('_');
  const firstPart = splittedRole[0];
  const secondPart = splittedRole[1] && splittedRole[1];

  let newRole = `${firstPart}`;

  if (secondPart) {
    newRole = `${firstPart}-${secondPart}`;
  }
  return newRole;
};

export {
  capitalizeFirstLetter,
  formatDate,
  formatDateWithoutWeekDay,
  formattedUserRole,
  formattedUserRoleForURL,
  getNextAvailableColumnNumber,
  roleRedirectMap,
};
