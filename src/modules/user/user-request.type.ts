import { Request } from 'express';
import { RequestBody, RequestParams } from '../../shared/types/index.js';
import { CreateUserDto, LoginUserDto } from './dto/user.dto.js';

export type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;

export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
