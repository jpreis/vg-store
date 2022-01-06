import { KeystoneContext } from "@keystone-6/core/types";

export const insertSeedData = async (context: KeystoneContext) => {
  const { db } = context;

  console.log("Inserting seed data...");
  await db.User.createOne({
    data: {
      name: "Samus Aran",
      email: "samus.aran@bountyhunters.com",
      password: "password",
    },
  });

  console.log(`✅ Seed data inserted.`);
  process.exit();
};
