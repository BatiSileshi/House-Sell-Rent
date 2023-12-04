// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from './auth.service';
// import { UsersService } from '../users/users.service';
// import { Users } from '../users/user.entity';


// describe('AuthService', () =>{

//   let service: AuthService

//   beforeEach(async () => {
//       // creating fake copy of auth service
//       const fakeUsersService: Partial<UsersService>= {
//         find: () => Promise.resolve([]),
//         create: (phone_number: string, password: string) => 
//         Promise.resolve({id: 1, phone_number, password} as Users),
//       };
//       const module = await Test.createTestingModule({
//         providers: [
//           AuthService,
//           {
//             // if anyone asks for UsersService -
//             provide: UsersService,
//             // give them fakeUsersService
//             useValue: fakeUsersService
//           }
//         ],
//       }).compile();
    
//       service = module.get(AuthService);
//   });
  
  
//   it('can create instance of auth service', async() => {
//     expect(service).toBeDefined();
//   });


//   it('creates anew user with salted and hashed password', async () =>{
//     const user = await service.signup('09234234', 'pwd', 'pwd');
//     expect(user.password).not.toEqual('pwd');
//   });


  
// });

// on Video 7
