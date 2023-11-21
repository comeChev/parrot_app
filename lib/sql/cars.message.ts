import { CarMessage } from "../cars";
import { Car_message } from "@prisma/client";
import { prisma } from "@/utils/prisma";

export async function createCarMessage(message: Car_message, carId: number) {
  const createdMessage: Car_message[] =
    await prisma.$queryRaw`INSERT INTO "Car_message" (
    car_message_contact_first_name, 
    car_message_contact_last_name,  
    car_message_contact_email,     
    car_message_contact_phone,      
    car_message_content,       
    car_message_status,            
    car_message_response,           
    car_message_response_type,     
    car_message_response_date,      
    car_id) VALUES (${message.car_message_contact_first_name}, ${message.car_message_contact_last_name}, ${message.car_message_contact_email}, ${message.car_message_contact_phone}, ${message.car_message_content}, ${message.car_message_status}, ${message.car_message_response}, ${message.car_message_response_type}, ${message.car_message_response_date}::timestamp, ${carId}) RETURNING *`;
  return createdMessage[0];
}

export async function deleteCarMessages(carId: number) {
  const deletedMessages =
    await prisma.$queryRaw`DELETE FROM "Car_message" WHERE car_id = ${carId}`;

  return deletedMessages;
}
