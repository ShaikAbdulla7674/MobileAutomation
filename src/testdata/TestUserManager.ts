
export class UserStore {
  private static readonly users: Record<string, TestUser> = {
    
    CommonUser: {
      email: "platinum.user.638968295754139038@yopmail.com",
      password: "123456789@A@*a",
      orderId: "35396032"
    },

    SilverUser: {
      email: "gold.user.638968250937750261@yopmail.com",
      password: "123456789@A@*a"
    },

    PasswordChangeUser: {
      email: "test.user.638968324378505563@yopmail.com",
      password: "123456789@A@*a"
    },

    ForgotPasswordUser: {
      email: "test.user.638968324378505563@yopmail.com",
      password: "123456789@A@*a"
    },

    LastFivePasswordUser: {
      email: "gold.user.638968318328353661@yopmail.com",
      password: "123456789@A@*a"
    },

    ChangeEmailUser: {
      email: "test.user.638945217577487578@yopmail.com",
      password: "123456789@A@*a"
    },

    MultipleReceiptsUser: {
      email: "platinum.user.638968313111474192@yopmail.com",
      password: "123456789@A@*a",
      orderId: "35396067",
      customerId: "25536087",
      orderTotal: "999.0000",
      orderLinePrice: "1999.00000"
    },

    UpdateAccountUser: {
      email: "platinum.user.638968339628621230@yopmail.com",
      password: "123456789@A@*a"
    },

    ValidFreeTrialUser: {
      email: "john.doe.638968403705596161@yopmail.com",
      password: "123456789@A@*a"
    },

    CdUserWithIssues: {
      email: "ws_Adf_platinum@wolterskluwer.com",
      password: "&iyD4mh?@yg$7c"
    },

    CPNPUser: {
      email: "automation.cpnp@yopmail.com",
      password: "123456789aA@"
    }
  };

  public static getUser(userType: string): TestUser {
    const user = this.users[userType];

    if (user) {
      return user;
    }

    throw new Error(`User type '${userType}' not found.`);
  }
}


export class TestUser {
  email!: string;
  password!: string;
  orderId?: string;
  customerId?: string;
  orderTotal?: string;
  orderLinePrice?: string;
}