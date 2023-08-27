
exports.buildGrades = (grades, releasedGrades) => {
  return {
    "data": {
      "disciplines": grades,
      "lastReleased": releasedGrades,
    },
  };
};
