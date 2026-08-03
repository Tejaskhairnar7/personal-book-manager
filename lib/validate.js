export function validateRegister(data) {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (data.name && data.name.length > 50) {
    errors.push('Name cannot exceed 50 characters');
  }
  if (!data.email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
    errors.push('Please provide a valid email');
  }
  if (!data.password || data.password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  return errors;
}

export function validateLogin(data) {
  const errors = [];

  if (!data.email) {
    errors.push('Email is required');
  }
  if (!data.password) {
    errors.push('Password is required');
  }

  return errors;
}

export function validateBook(data) {
  const errors = [];

  if (!data.title || data.title.trim().length < 1) {
    errors.push('Title is required');
  }
  if (data.title && data.title.length > 200) {
    errors.push('Title cannot exceed 200 characters');
  }
  if (!data.author || data.author.trim().length < 1) {
    errors.push('Author is required');
  }
  if (data.author && data.author.length > 100) {
    errors.push('Author cannot exceed 100 characters');
  }
  if (data.description && data.description.length > 2000) {
    errors.push('Description cannot exceed 2000 characters');
  }
  if (data.tags && !Array.isArray(data.tags)) {
    errors.push('Tags must be an array');
  }
  if (data.tags && data.tags.length > 10) {
    errors.push('Cannot have more than 10 tags');
  }
  if (
    data.readingStatus &&
    !['Want To Read', 'Reading', 'Completed'].includes(data.readingStatus)
  ) {
    errors.push('Invalid reading status');
  }
  if (data.readingProgress !== undefined) {
    const progress = Number(data.readingProgress);
    if (isNaN(progress) || progress < 0 || progress > 100) {
      errors.push('Reading progress must be between 0 and 100');
    }
  }

  return errors;
}

export function sanitizeInput(input) {
  if (typeof input === 'string') {
    return input.replace(/[$.{}[\]/\\]/g, '').trim();
  }
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  if (typeof input === 'object' && input !== null) {
    const sanitized = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  return input;
}