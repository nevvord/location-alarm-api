import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  // @IsString()
  // @IsNotEmpty()
  // code: string;
  //
  // @IsString()
  // @IsNotEmpty()
  // redirectUri: string;
}
