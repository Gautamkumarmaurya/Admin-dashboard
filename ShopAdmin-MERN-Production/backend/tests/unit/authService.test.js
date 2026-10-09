import {
  hashPassword,
  comparePassword,
} from "../../src/utils/hashPassword.js";

import {
  generateToken,
} from "../../src/utils/generateToken.js";

// Password hashing and comparison
test(
  "password hashing and comparison",
  async () => {
    const hash = await hashPassword(
      "secret123"
    );

    expect(hash).not.toBe("secret123");

    expect(
      await comparePassword(
        "secret123",
        hash
      )
    ).toBe(true);

    expect(
      await comparePassword(
        "wrong",
        hash
      )
    ).toBe(false);
  }
);

// JWT generation
test("jwt generation", () => {
  const token = generateToken({
    _id: "507f1f77bcf86cd799439011",
    role: "admin",
  });

  expect(token.split(".")).toHaveLength(3);
});