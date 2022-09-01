from .db import db


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255))
    server_pic = db.Column(db.String(255))

    user = db.relationship("User", back_populates='servers')
    channels = db.relationship("Channel", back_populates='server', cascade="all, delete")


    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'server_pic': self.server_pic
        }

    def to_dict_id(self):
        return {
            'id': self.id
        }
