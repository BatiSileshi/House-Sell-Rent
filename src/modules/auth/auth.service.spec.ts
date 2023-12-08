import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Users } from '../users/user.entity';

// creating test suit (description)
describe('AuthService', () =>{

  let service: AuthService
  let fakeUsersService: Partial<UsersService>

  //setting up beforeEach hook to run before each test
  beforeEach(async () => {
      // creating fake copy of users service
      fakeUsersService = {
        find: () => Promise.resolve([]),
        create: (phone_number: string, password: string) => 
        Promise.resolve({id: 1, phone_number, password} as Users),
      };
      const module = await Test.createTestingModule({
        providers: [
          AuthService,
          {
            // if anyone asks for UsersService -
            provide: UsersService,
            // give them fakeUsersService
            useValue: fakeUsersService
          }
        ],
      }).compile();
    
      // initializing the "AuthService" with fake UsersService
      service = module.get(AuthService);
  });
  
  
  it('can create instance of auth service', async() => {
    expect(service).toBeDefined();
  });


  it('creates a new user with salted and hashed password', async () =>{
    const user = await service.signup('09234234', 'pwd', 'pwd');
    expect(user.password).not.toEqual('pwd');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws error if phone number already registered', async (done)=>{
    fakeUsersService.find = () => Promise.resolve([{ id: 1, phone_number: '09', password: 'pwd'} as Users]) 
    try{
        await service.signup('09234234', 'pwd', 'pwd');
    } catch (err){
        done();
    }

  });

  it('throws error if signin is called with an unused phone number', async(done)=>{
    try{
        await service.signin('09', 'pwd');
    }catch (err){
        done();
    }
  });

  it('throws if invalid password is provided', async(done)=>{
    fakeUsersService.find = () => Promise.resolve([
      {phone_number: '090909', password: 'pwd'} as Users,
    ]);
    try{
      await service.signin('0909099090', 'password');
    }catch(err){
      done();
    }
  });

  
});

//npm run test:watch
//npm run test
