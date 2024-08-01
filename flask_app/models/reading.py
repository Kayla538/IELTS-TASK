from mysqlconnection import connectToMySQL  
class Passage:
    DB = "ielts" 

    def __init__(self, data):
        self.id = data.get('id')
        self.topic = data.get('topic')
        self.passage_text = data.get('passage_text')
        self.level = data.get('level')

    @classmethod
    def save(cls, data):
        query = """
        INSERT INTO passages (topic, passage_text, level)
        VALUES (%(topic)s, %(passage_text)s, %(level)s);
        """
        return connectToMySQL(cls.DB).query_db(query, data)

    @classmethod
    def get_by_id(cls, data):
        query = "SELECT * FROM passages WHERE id = %(id)s;"
        result = connectToMySQL(cls.DB).query_db(query, data)
        return cls(result[0]) if result else None

    @classmethod
    def get_passage_id(cls, topic, passage_text):
        query = """
        SELECT id FROM passages WHERE topic = %(topic)s AND passage_text = %(passage_text)s;
        """
        result = connectToMySQL(cls.DB).query_db(query, {'topic': topic, 'passage_text': passage_text})
        return result[0]['id'] if result else None


class Question:
    DB = "ielts" 

    def __init__(self, data):
        self.id = data.get('id')
        self.passage_id = data.get('passage_id')
        self.question_text = data.get('question_text')
        self.correct_answer = data.get('correct_answer')

    @classmethod
    def save(cls, data):
        query = """
        INSERT INTO questions (passage_id, question_text, correct_answer)
        VALUES (%(passage_id)s, %(question_text)s, %(correct_answer)s);
        """
        return connectToMySQL(cls.DB).query_db(query, data)

    @classmethod
    def get_by_id(cls, data):
        query = "SELECT * FROM questions WHERE id = %(id)s;"
        result = connectToMySQL(cls.DB).query_db(query, data)
        return cls(result[0]) if result else None



class UserAnswer:
    DB = "ielts"  

    def __init__(self, data):
        self.id = data.get('id')
        self.user_id = data.get('user_id')
        self.question_id = data.get('question_id')
        self.answer = data.get('answer')

    @classmethod
    def save(cls, data):
        query = """
        INSERT INTO user_answers (user_id, question_id, answer)
        VALUES (%(user_id)s, %(question_id)s, %(answer)s);
        """
        return connectToMySQL(cls.DB).query_db(query, data)

    @classmethod
    def get_by_user_and_question(cls, user_id, question_id):
        query = """
        SELECT * FROM user_answers WHERE user_id = %(user_id)s AND question_id = %(question_id)s;
        """
        result = connectToMySQL(cls.DB).query_db(query, {'user_id': user_id, 'question_id': question_id})
        return cls(result[0]) if result else None
