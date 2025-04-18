/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
    @ApiProperty({
        description: 'User name',
        example: 'Alice',
    })
     name: string;

     
  @ApiProperty({
    description: 'User email address',
    example: 'alice@example.com',
  })
  @IsEmail()
   email: string;




  @ApiProperty({
    description: 'User password (at least 8 characters)',
    example: 'S3cr3tP@ssw0rd',
  })
  @IsString()
  @MinLength(8)
   password: string;

   

}
