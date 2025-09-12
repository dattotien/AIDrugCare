from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional

class Database:
    client: Optional[AsyncIOMotorClient] = None
    db = None
    
    @classmethod
    async def connect_to_database(cls):
        if cls.client is None:
            cls.client = AsyncIOMotorClient(
    "mongodb+srv://ngyen23102005:ntnynguqua4%2A%21@hospital.tu2dajb.mongodb.net/Hospital?retryWrites=true&w=majority")
            cls.db = cls.client["Hospital"]
    
    @classmethod
    async def close_database_connection(cls):
        if cls.client:
            cls.client.close()
            cls.client = None
            cls.db = None
    
    @classmethod
    def get_database(cls):
        if cls.db is None:
            raise Exception("Database not initialized")
        return cls.db
