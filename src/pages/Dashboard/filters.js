export default {
  all: () => true,
  critical: ({ urgency }) => urgency > 3,
  complete: ({ complete }) => complete,
  incomplete: ({ complete }) => !complete
};
