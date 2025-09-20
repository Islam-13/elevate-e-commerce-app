import { Observable } from 'rxjs';
import { LoginDTO } from '../interfaces/login.dto';
import { LoginAdapterRes, LoginResponseDTO } from '../interfaces/loginRes.dto';
import { ErrorResponseDTO } from '../interfaces/error.interface';
import { RegisterDTO } from '../interfaces/register.dto';
import { RegisterAdapterRes } from '../interfaces/registerRes.dto';
import { ForgetPasswordDTO } from '../interfaces/forgetPassword.dto';
import { ForgetPasswordAdapterRes } from '../interfaces/forgetPasswordRes.dto';
import { LogoutAdapterRes } from '../interfaces/logoutRes.dto';

export interface AuthApiInterface {
  login(data: LoginDTO): Observable<LoginAdapterRes | ErrorResponseDTO>;
  register(data: RegisterDTO): Observable<RegisterAdapterRes>;
  forgetPassword(data: ForgetPasswordDTO): Observable<ForgetPasswordAdapterRes>;
  logout(): Observable<LogoutAdapterRes>;
  verifyCode(data: any): Observable<any>;
  resetPassword(data: any): Observable<any>;
}
