import { AuthService } from './authentication/auth.service';
import { HttpClientService } from './http-client.service';
import { PhoneService } from './phone/phone.service';
import { CommentService } from './comment/comment.service';
import { HomeService } from './home/home.service';

export const allServices = [
    HttpClientService,
    AuthService,
    PhoneService,
    CommentService,
    HomeService,
]