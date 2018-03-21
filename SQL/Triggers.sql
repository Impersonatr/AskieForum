DELIMITER ;;
CREATE TRIGGER `setQuestionTime` 
    BEFORE INSERT ON `Question` 
    FOR EACH ROW 
BEGIN
    SET NEW.postTime = NOW();
    SET NEW.updateTime = NOW();
END;
DELIMITER ;