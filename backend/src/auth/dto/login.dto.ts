/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'alice@gmail.com'  ,
  })
  @IsEmail()
  email: string;
@ApiProperty({
    description: 'User password',
    example: 'S3cr3tP@ssw0rd',
})
  @IsString()
  password: string;
}

