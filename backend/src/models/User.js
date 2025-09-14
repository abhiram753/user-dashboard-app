const { db } = require('../config/database');

class User {
  constructor(userData) {
    this.name = userData.name;
    this.email = userData.email;
    this.phone = userData.phone;
    this.company = userData.company;
    this.street = userData.street;
    this.city = userData.city;
    this.zipcode = userData.zipcode;
    this.lat = userData.lat;
    this.lng = userData.lng;
  }

  // Get all users
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users ORDER BY created_at DESC`;
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map(this.formatUser));
        }
      });
    });
  }

  // Get user by ID
  static getById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE id = ?`;
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? this.formatUser(row) : null);
        }
      });
    });
  }

  // Create new user
  create() {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO users (name, email, phone, company, street, city, zipcode, lat, lng)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const params = [
        this.name, this.email, this.phone, this.company,
        this.street, this.city, this.zipcode, this.lat, this.lng
      ];

      db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          User.getById(this.lastID).then(resolve).catch(reject);
        }
      });
    });
  }

  // Update user
  static update(id, userData) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE users SET 
          name = ?, email = ?, phone = ?, company = ?,
          street = ?, city = ?, zipcode = ?, lat = ?, lng = ?
        WHERE id = ?
      `;
      const params = [
        userData.name, userData.email, userData.phone, userData.company,
        userData.street, userData.city, userData.zipcode, userData.lat, userData.lng, id
      ];

      db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          reject(new Error('User not found'));
        } else {
          User.getById(id).then(resolve).catch(reject);
        }
      });
    });
  }

  // Delete user
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM users WHERE id = ?`;
      db.run(sql, [id], function(err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          reject(new Error('User not found'));
        } else {
          resolve({ id, deleted: true });
        }
      });
    });
  }

  // Format user data for response
  static formatUser(row) {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      company: row.company,
      address: {
        street: row.street,
        city: row.city,
        zipcode: row.zipcode,
        geo: {
          lat: row.lat,
          lng: row.lng
        }
      },
      created_at: row.created_at,
      updated_at: row.updated_at
    };
  }
}

module.exports = User;
