import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

// Type definitions
interface User {
  id: number;
  email: string;
  name?: string;
  // Add other user fields as needed
}

// Database connection
let db: Database | null = null;

async function initializeDatabase(): Promise<Database> {
  if (db) return db;
  
  db = await open({
    filename: path.join(__dirname, 'mydb.sqlite'),
    driver: sqlite3.Database
  });
  
  return db;
}

export async function getUserById(userId: number): Promise<User | string> {
  try {
    const database = await initializeDatabase();
    const user = await database.get<User>(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );
    
    if (user) {
      return user;
    } else {
      return "User not found.";
    }
  } catch (error) {
    console.error('Database error:', error);
    return "Database error occurred.";
  }
}

export async function updateUserEmail(userId: number, newEmail: string): Promise<string> {
  try {
    const database = await initializeDatabase();
    await database.run(
      'UPDATE users SET email = ? WHERE id = ?',
      [newEmail, userId]
    );
    
    return "Email updated successfully";
  } catch (error) {
    console.error('Database error:', error);
    return "Failed to update email.";
  }
}