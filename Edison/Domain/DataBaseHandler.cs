using Edison.Models;
using Microsoft.CodeAnalysis;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Edison.Domain
{
    public class DataBaseHandler
    {
        public static readonly string connectingString = $"Host=localhost;Username=postgres;Password=admin;Database=edison";

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
            try
            {
                using (var conn = new NpgsqlConnection(connectingString))
                {
                    conn.Open();
                    var command = new NpgsqlCommand($"INSERT INTO users(user_name,user_password,is_admin) VALUES ('{username}','{password}','{usertype}')", conn);
                    command.ExecuteNonQuery();
                    conn.Close();
                }

            }
            catch (Npgsql.PostgresException)
            {
                throw new Exception("Username is already used.");
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


        public void AddModelToUser(string username, string carmodel, string carcolor,string carwheel)
        {
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                var command = new NpgsqlCommand($"INSERT INTO carmodel(user_name, car_model, car_color, car_wheel, car_payed) VALUES ('{username}','{carmodel}','{carcolor}','{carwheel}','unpaid')", conn);
                command.ExecuteNonQuery();          
                conn.Close();
            }

        }

        public CarModel GetModelForUser(string username)
        {
            CarModel car = new CarModel();
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT * FROM carmodel WHERE user_name ='{username}' AND car_payed ='unpaid'", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        var ModelType = Convert.ToString(reader["car_model"]);
                        var ModelColor = Convert.ToString(reader["car_color"]);
                        var ModelWheel = Convert.ToString(reader["car_wheel"]);
                        var IsPayed = Convert.ToString(reader["car_payed"]);
                        car = new CarModel(ModelType, ModelColor, ModelWheel, IsPayed);
                    }
                }
                conn.Close();
            }       
            return car;
        }

        public void MakeCarPayed()
        {
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                var command = new NpgsqlCommand($"UPDATE carmodel SET car_payed = 'paid' WHERE car_id = (SELECT max(car_id) FROM carmodel); ", conn);
                command.ExecuteNonQuery();
                conn.Close();
            }
        }

        public void CreateTransaction(string user)
        {
            int id = 0;
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT * FROM carmodel WHERE car_id = (SELECT max(car_id) FROM carmodel)", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                       id = Convert.ToInt32(reader["car_id"]);
                    }
                }
                conn.Close();
            }

            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                var command = new NpgsqlCommand($"INSERT INTO transactions(car_id, user_name, datetime) VALUES ({id},'{user}','{DateTime.Now}')", conn);
                command.ExecuteNonQuery();
                Console.WriteLine(DateTime.Now);
                conn.Close();
            }

        }


        public TransactionModel GetTransactionForOrder()
        {
            TransactionModel order = new TransactionModel();
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT * FROM transactions WHERE transaction_id = (SELECT max(transaction_id) FROM transactions)", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        var transid = Convert.ToInt32(reader["transaction_id"]);
                        var carid = Convert.ToInt32(reader["car_id"]);
                        var username = Convert.ToString(reader["user_name"]);
                        var date = Convert.ToString(reader["datetime"]);
                        order = new TransactionModel(transid,carid,username,date);
                    }
                }
                conn.Close();
            }
            return order;
        }

        public void DeleteCarAfterOrder()
        {
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                var command = new NpgsqlCommand($"DELETE FROM carmodel WHERE car_id = (SELECT max(car_id) FROM carmodel)", conn);
                var reader = command.ExecuteNonQuery();
                conn.Close();
            }
        }

        public bool DeleteUser(string username)
        {
            try
            {
                using (var conn = new NpgsqlConnection(connectingString))
                {
                    conn.Open();
                    var command = new NpgsqlCommand($"DELETE FROM userlog WHERE user_name = '{username}'", conn);
                    var reader = command.ExecuteNonQuery();
                    conn.Close();
                }

                using (var conn = new NpgsqlConnection(connectingString))
                {
                    conn.Open();
                    var command = new NpgsqlCommand($"DELETE FROM transactions WHERE user_name = '{username}'", conn);
                    var reader = command.ExecuteNonQuery();
                    conn.Close();
                }

                using (var conn = new NpgsqlConnection(connectingString))
                {
                    conn.Open();
                    var command = new NpgsqlCommand($"DELETE FROM carmodel WHERE user_name = '{username}'", conn);
                    var reader = command.ExecuteNonQuery();
                    conn.Close();
                }

                using (var conn = new NpgsqlConnection(connectingString))
                {
                    conn.Open();
                    var command = new NpgsqlCommand($"DELETE FROM users WHERE user_name = '{username}'", conn);
                    var reader = command.ExecuteNonQuery();
                    conn.Close();
                }
                return true;
            }
            catch (Npgsql.NpgsqlException)
            {
                return false;
            }
        }


        public void CreateUserActivity(string username, string activity)
        {
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                var command = new NpgsqlCommand($"INSERT INTO userlog(user_name,user_activity) VALUES ('{username}','{activity}')", conn);
                command.ExecuteNonQuery();
                conn.Close();
            }
        }


        public List<UserActivityModel> GetAllUserActivity()
        {
            List<UserActivityModel> activityModels = new List<UserActivityModel>();
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT * FROM userlog", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        UserActivityModel userActivity = new UserActivityModel();
                        var user_id = Convert.ToString(reader["user_name"]);
                        var user_activity = Convert.ToString(reader["user_activity"]);
                        userActivity = new UserActivityModel(user_id, user_activity);
                        activityModels.Add(userActivity);                      
                    }
                }
                conn.Close();
            }
            return activityModels;
        }


        public List<CarModel> GetAllUserModels(string username)
        {
            List<CarModel> models = new List<CarModel>();
            using (var conn = new NpgsqlConnection(connectingString))
            {
                conn.Open();
                using (var command = new NpgsqlCommand($"SELECT * FROM carmodel WHERE user_name = '{username}'", conn))
                {
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        CarModel car = new CarModel();
                        var car_id = Convert.ToInt32(reader["car_id"]);
                        var car_model = Convert.ToString(reader["car_model"]);
                        var car_color = Convert.ToString(reader["car_color"]);
                        var car_wheel = Convert.ToString(reader["car_wheel"]);
                        var car_payed = Convert.ToString(reader["car_payed"]);
                        car = new CarModel(car_id, car_model, car_color, car_wheel, car_payed);
                        models.Add(car);
                    }
                }
                conn.Close();
            }
            return models;
        }
    }
}
