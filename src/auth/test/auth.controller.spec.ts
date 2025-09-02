import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { loginDto } from '../dto/login.dto';
import { ResponseDto } from '../dto/response.dto';

// Mock do AuthService
const mockAuthService = {
    registerStudent: jest.fn(),
    login: jest.fn(),
};

describe('AuthController', () => {
    let controller: AuthController;

    beforeEach(async () => {
        jest.clearAllMocks();

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{ provide: AuthService, useValue: mockAuthService }],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('Deve chamar o authService.registerStudent com os dados corretos e retornar o resultado', async () => {
        const createAuthDto: CreateAuthDto = {
            name: 'Test Student',
            phone: '123456789',
            address: 'Test Address',
            cpf: '00000000000',
            date_of_birth: '01/01/2000',
            email: 'test@example.com',
            password: 'password123',
        };

        const expectedResult = {
            id: 'user-id-123',
            name: createAuthDto.name,
            email: createAuthDto.email,
        };

        mockAuthService.registerStudent.mockResolvedValue(expectedResult);

        const result = await controller.registerStudent(createAuthDto);

        expect(result).toEqual(expectedResult);
        expect(mockAuthService.registerStudent).toHaveBeenCalledWith(createAuthDto);
    });

    it('Deve chamar o authService.login com as credenciais corretas e retornar o access_token', async () => {
        const loginDto: loginDto = {
            email: 'test@example.com',
            password: 'password123',
        };

        const expectedResponse: ResponseDto = {
            access_token: 'mocked-jwt-token',
        };

        mockAuthService.login.mockResolvedValue(expectedResponse);

        const result = await controller.login(loginDto);

        expect(result).toEqual(expectedResponse);
        expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });
});