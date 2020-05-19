using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Edison.Domain
{
    public class DataBaseHandler
    {
        public static readonly string connectingString = $"Host=localhost;Username=postgres;Password=admin;Database=Edison";

        public bool Login(string username, string password)
        {
            string user_name = "";
            string user_password = "";
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT user_name, user_password FROM users WHERE user_name='{username}' AND user_password='{password}'", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        user_name = Convert.ToString(reader["user_name"]);
                        user_password = Convert.ToString(reader["user_password"]);
                    }
                }
                conn.Close();
            }

            if (user_name != "" && user_password != "")
            {
                return true;
            }
            return false;
        }

        public void Register(string username, string password, string usertype)
        {

            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                var command = new NpgsqlCommand($"INSERT INTO users(user_name,user_password,is_admin) VALUES ('{username}','{password}','{usertype}')", conn);
                command.ExecuteNonQuery();
                conn.Close();
            }
        }


        public int GetUserByName(string userName)
        {
            int user_id = 0;
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT user_id FROM users WHERE user_name='{userName}'", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        user_id = Convert.ToInt32(reader["user_id"]);
                    }
                }
                conn.Close();
            }
            return user_id;
        }


        public bool IsAdmin(string username)
        {
            var is_admin = "";
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT is_admin FROM users WHERE user_name = '{username}'", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        is_admin = Convert.ToString(reader["is_admin"]);
                    }
                }
                conn.Close();
            }

            if (is_admin == "admin")
            {
                return true;
            }
            return false;

        }


    }
}
