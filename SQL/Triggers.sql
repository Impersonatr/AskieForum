
CREATE TRIGGER `setResponseTime` 
	BEFORE INSERT ON `Response` 
	FOR EACH ROW 
BEGIN
		SET NEW.postTime = NOW();
    	SET NEW.updateTime = NOW();
END

CREATE TRIGGER `updateResponseTime` BEFORE UPDATE ON `Response` FOR EACH ROW BEGIN
    SET NEW.updateTime = NOW();
END


CREATE TRIGGER `setQuestionTime` BEFORE INSERT ON `Question` FOR EACH ROW BEGIN
	SET NEW.postTime = NOW();
    SET NEW.updateTime = NOW();
END


CREATE TRIGGER `updateQuestionTime` BEFORE UPDATE ON `Question` FOR EACH ROW BEGIN
    SET NEW.updateTime = NOW();
END
