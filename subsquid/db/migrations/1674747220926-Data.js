module.exports = class Data1674747220926 {
  name = "Data1674747220926";

  async up(db) {
    await db.query(
      `CREATE TABLE "account" ("id" character varying NOT NULL, "event_id" text NOT NULL, "block_id" text NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`
    );
    await db.query(
      `CREATE TABLE "pablo_pool_asset" ("id" character varying NOT NULL, "asset_id" text NOT NULL, "total_liquidity" numeric NOT NULL, "total_volume" numeric NOT NULL, "block_id" text NOT NULL, "weight" numeric NOT NULL, "pool_id" character varying, CONSTRAINT "PK_fc75f8a8a8a0ac8408eef787237" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_7fd4cdb45620476d1de745a265" ON "pablo_pool_asset" ("pool_id") `);
    await db.query(
      `CREATE TABLE "pablo_asset_weight" ("id" character varying NOT NULL, "asset_id" text NOT NULL, "weight" numeric NOT NULL, "block_id" text NOT NULL, "pool_id" character varying, CONSTRAINT "PK_dc958c38ef7c95de59fb7b3cc3b" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_956be1c3085c6b2256333aca78" ON "pablo_asset_weight" ("pool_id") `);
    await db.query(`CREATE INDEX "IDX_986c61507f2b090b168939c3ba" ON "pablo_asset_weight" ("asset_id") `);
    await db.query(
      `CREATE TABLE "pablo_pool" ("id" character varying NOT NULL, "event_id" text NOT NULL, "owner" text NOT NULL, "pool_type" character varying(24) NOT NULL, "lp_issued" numeric NOT NULL, "transaction_count" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_id" text NOT NULL, "quote_asset_id" text NOT NULL, CONSTRAINT "PK_28d674c3fdadf69d19745e5343a" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_76686140a45d0a11fadadc16f6" ON "pablo_pool" ("owner") `);
    await db.query(`CREATE INDEX "IDX_c5772b79e56d97f7eee239ba9e" ON "pablo_pool" ("timestamp") `);
    await db.query(
      `CREATE TABLE "activity" ("id" character varying NOT NULL, "account_id" text NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_id" text NOT NULL, "event_id" character varying, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_c2c1e9fdda754a6bf7f664d7e0" ON "activity" ("event_id") `);
    await db.query(`CREATE INDEX "IDX_96c7c848eec1feba0bc66b4519" ON "activity" ("account_id") `);
    await db.query(`CREATE INDEX "IDX_1ed07d94b85322141135c8de3e" ON "activity" ("timestamp") `);
    await db.query(
      `CREATE TABLE "event" ("id" character varying NOT NULL, "account_id" text, "event_type" character varying(43) NOT NULL, "block_number" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_id" text NOT NULL, "tx_hash" text, "success" boolean, "fail_reason" text, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_77b76886d64fa0304db94dd4d9" ON "event" ("account_id") `);
    await db.query(`CREATE INDEX "IDX_a8a7fbbbb0d8305cd81eda6ac8" ON "event" ("block_number") `);
    await db.query(`CREATE INDEX "IDX_2c15918ff289396205521c5f3c" ON "event" ("timestamp") `);
    await db.query(
      `CREATE TABLE "pablo_fee" ("id" character varying NOT NULL, "asset_id" text NOT NULL, "account" text NOT NULL, "fee" numeric NOT NULL, "lp_fee" numeric NOT NULL, "owner_fee" numeric NOT NULL, "protocol_fee" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_id" text NOT NULL, "event_id" character varying, "pool_id" character varying, CONSTRAINT "PK_4dbf15d0cbe73b1484a6439b639" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_f021dfa4e9b4259d736c62d322" ON "pablo_fee" ("event_id") `);
    await db.query(`CREATE INDEX "IDX_ea38fdb5b539714d71d9375e5c" ON "pablo_fee" ("pool_id") `);
    await db.query(`CREATE INDEX "IDX_03c50b6e6cf75fee46d497c781" ON "pablo_fee" ("asset_id") `);
    await db.query(`CREATE INDEX "IDX_d827606a2b1456629fc123e175" ON "pablo_fee" ("account") `);
    await db.query(`CREATE INDEX "IDX_3d0ff85f15733b3586eb990807" ON "pablo_fee" ("timestamp") `);
    await db.query(
      `CREATE TABLE "pablo_swap" ("id" character varying NOT NULL, "base_asset_id" text NOT NULL, "base_asset_amount" numeric NOT NULL, "quote_asset_id" text NOT NULL, "quote_asset_amount" numeric NOT NULL, "spot_price" text NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_id" text NOT NULL, "event_id" character varying, "pool_id" character varying, "fee_id" character varying, CONSTRAINT "PK_8272932acc7b483b80c8c299633" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_67ce5c4413b9099e2519d70fe5" ON "pablo_swap" ("event_id") `);
    await db.query(`CREATE INDEX "IDX_f6026f4c1626dc7e3e119c97c8" ON "pablo_swap" ("pool_id") `);
    await db.query(`CREATE INDEX "IDX_c8f54ece4041badf1a7a38f79e" ON "pablo_swap" ("base_asset_id") `);
    await db.query(`CREATE INDEX "IDX_e1cf205ce04bf33f31197245df" ON "pablo_swap" ("quote_asset_id") `);
    await db.query(`CREATE INDEX "IDX_43529b9c0dc0c5c73ad22ffc61" ON "pablo_swap" ("fee_id") `);
    await db.query(`CREATE INDEX "IDX_f6217e443e7644ba555a75b989" ON "pablo_swap" ("timestamp") `);
    await db.query(
      `CREATE TABLE "pablo_liquidity_added" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_id" text NOT NULL, "amounts" jsonb NOT NULL, "event_id" character varying, "pool_id" character varying, CONSTRAINT "PK_4ed18af0c7b4a02f70fd9f119eb" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_bafde96a7f97a136193c5aac2e" ON "pablo_liquidity_added" ("event_id") `);
    await db.query(`CREATE INDEX "IDX_a057af366fd184a7c71fd19e34" ON "pablo_liquidity_added" ("pool_id") `);
    await db.query(`CREATE INDEX "IDX_12052a331774a4ef713e00c4af" ON "pablo_liquidity_added" ("timestamp") `);
    await db.query(
      `CREATE TABLE "pablo_liquidity_removed" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_id" text NOT NULL, "amounts" jsonb NOT NULL, "event_id" character varying, "pool_id" character varying, CONSTRAINT "PK_d2a2d66e592aac75e808b530f89" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_99cd30a53612c12da96ba255f9" ON "pablo_liquidity_removed" ("event_id") `);
    await db.query(`CREATE INDEX "IDX_cc8c8c14f2ee44a3c73e18fd9b" ON "pablo_liquidity_removed" ("pool_id") `);
    await db.query(`CREATE INDEX "IDX_b823763f594c476d25eb851bb6" ON "pablo_liquidity_removed" ("timestamp") `);
    await db.query(
      `CREATE TABLE "pablo_transaction" ("id" character varying NOT NULL, "account" text NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_id" text NOT NULL, "tx_type" character varying(16) NOT NULL, "pool_id" character varying, "event_id" character varying, "swap_id" character varying, "liquidity_added_id" character varying, "liquidity_removed_id" character varying, CONSTRAINT "PK_8b040ecc6da14a71ef547ae2ae6" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_969a927080f5b6c81b79b40cd8" ON "pablo_transaction" ("pool_id") `);
    await db.query(`CREATE INDEX "IDX_126f5e07c560f23355c16a3f27" ON "pablo_transaction" ("account") `);
    await db.query(`CREATE INDEX "IDX_521c4ea4ac07c98f74d2a70423" ON "pablo_transaction" ("timestamp") `);
    await db.query(`CREATE INDEX "IDX_0118a010cf1571fc5cb70b90a7" ON "pablo_transaction" ("event_id") `);
    await db.query(`CREATE INDEX "IDX_efc2b9a858fe9c1b2fce95b744" ON "pablo_transaction" ("swap_id") `);
    await db.query(`CREATE INDEX "IDX_a75c0addf49ff4854cd1d391ac" ON "pablo_transaction" ("liquidity_added_id") `);
    await db.query(`CREATE INDEX "IDX_8581db5407f7bcc89bbb90769f" ON "pablo_transaction" ("liquidity_removed_id") `);
    await db.query(
      `CREATE TABLE "bonded_finance_bond_offer" ("id" character varying NOT NULL, "event_id" text NOT NULL, "offer_id" text NOT NULL, "total_purchased" numeric NOT NULL, "beneficiary" text NOT NULL, "cancelled" boolean NOT NULL, "block_id" text NOT NULL, CONSTRAINT "PK_1a7a97e3d57a4ac842dc2ef48ba" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_932377f288f9b8ae200c9ed313" ON "bonded_finance_bond_offer" ("event_id") `);
    await db.query(`CREATE INDEX "IDX_733dd0609e90b935c61877da93" ON "bonded_finance_bond_offer" ("offer_id") `);
    await db.query(
      `CREATE TABLE "vesting_schedule" ("id" character varying NOT NULL, "from" text NOT NULL, "event_id" text NOT NULL, "schedule_id" numeric NOT NULL, "to" text NOT NULL, "asset_id" text NOT NULL, "schedule" jsonb NOT NULL, "total_amount" numeric NOT NULL, "fully_claimed" boolean NOT NULL, "block_id" text NOT NULL, CONSTRAINT "PK_4818b05532ed9058110ed5b5b13" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_1f8cb2fc5b3d42fcd5bacfe8bc" ON "vesting_schedule" ("from") `);
    await db.query(`CREATE INDEX "IDX_2470998bd5d66304c8ff329e84" ON "vesting_schedule" ("event_id") `);
    await db.query(`CREATE INDEX "IDX_020d628167fb6a0158d25abf5e" ON "vesting_schedule" ("schedule_id") `);
    await db.query(
      `CREATE TABLE "historical_asset_price" ("id" character varying NOT NULL, "event_id" text NOT NULL, "price" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "currency" character varying(3) NOT NULL, "block_id" text NOT NULL, "asset_id" character varying, CONSTRAINT "PK_01a6bc75d8046fb5aa80df3b9fe" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_754559c3337480cf2b30d157b2" ON "historical_asset_price" ("event_id") `);
    await db.query(`CREATE INDEX "IDX_e5b6c7a8a991d63c9670391daa" ON "historical_asset_price" ("asset_id") `);
    await db.query(`CREATE INDEX "IDX_25fff2ead369948d7e8aa4ab23" ON "historical_asset_price" ("timestamp") `);
    await db.query(
      `CREATE TABLE "asset" ("id" character varying NOT NULL, "event_id" text NOT NULL, "price" numeric NOT NULL, "decimals" integer, "block_id" text NOT NULL, CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_3d0534c2bb8faaf00628625ad2" ON "asset" ("event_id") `);
    await db.query(
      `CREATE TABLE "reward_pool" ("id" character varying NOT NULL, "event_id" text NOT NULL, "pool_id" text NOT NULL, "block_id" text NOT NULL, CONSTRAINT "PK_c88dfa6b514dcbadb05c6956afb" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_863db0d97cf58a3f045eddaca4" ON "reward_pool" ("event_id") `);
    await db.query(`CREATE INDEX "IDX_a2320054a632a80a4c6be32a3d" ON "reward_pool" ("pool_id") `);
    await db.query(
      `CREATE TABLE "staking_position" ("id" character varying NOT NULL, "fnft_collection_id" text NOT NULL, "fnft_instance_id" text NOT NULL, "owner" text NOT NULL, "asset_id" text NOT NULL, "amount" numeric NOT NULL, "start_timestamp" numeric NOT NULL, "duration" numeric NOT NULL, "end_timestamp" numeric, "reward_multiplier" numeric NOT NULL, "source" character varying(16) NOT NULL, "event_id" character varying NOT NULL, CONSTRAINT "REL_3e2e1b465d89dbb2736e70fe5f" UNIQUE ("event_id"), CONSTRAINT "PK_899113a8f0b5ec707171ff4db6b" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE UNIQUE INDEX "IDX_3e2e1b465d89dbb2736e70fe5f" ON "staking_position" ("event_id") `);
    await db.query(`CREATE INDEX "IDX_71ba8ca256d4cc74b9440bf2ac" ON "staking_position" ("fnft_instance_id") `);
    await db.query(`CREATE INDEX "IDX_e94373a6b771b4edcaca7950bc" ON "staking_position" ("owner") `);
    await db.query(
      `CREATE UNIQUE INDEX "IDX_69e08176f6778a2a276720109d" ON "staking_position" ("fnft_collection_id", "fnft_instance_id") `
    );
    await db.query(
      `CREATE TABLE "historical_locked_value" ("id" character varying NOT NULL, "amount" numeric NOT NULL, "accumulated_amount" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "source" character varying(16) NOT NULL, "asset_id" text NOT NULL, "source_entity_id" text, "block_id" text NOT NULL, "event_id" character varying, CONSTRAINT "PK_39755ccbc61547e8b814bf28188" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_e16f52796ccae0d99cb8d6e404" ON "historical_locked_value" ("event_id") `);
    await db.query(`CREATE INDEX "IDX_57be1b98925b8ed2c98e4c6124" ON "historical_locked_value" ("timestamp") `);
    await db.query(`CREATE INDEX "IDX_476e4f27f23b927c12b40c17ce" ON "historical_locked_value" ("asset_id") `);
    await db.query(`CREATE INDEX "IDX_7ee4ac4392690114171a6ddc25" ON "historical_locked_value" ("source_entity_id") `);
    await db.query(
      `CREATE TABLE "historical_volume" ("id" character varying NOT NULL, "amount" numeric NOT NULL, "accumulated_amount" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "asset_id" text NOT NULL, "source" character varying(16) NOT NULL, "block_id" text NOT NULL, "event_id" character varying, "pool_id" character varying, CONSTRAINT "PK_7f5775a1b43be10057e93cad992" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_eceb392fe7bbe48cb21e1d8b5a" ON "historical_volume" ("event_id") `);
    await db.query(`CREATE INDEX "IDX_e6fa17aa4250e438cb6286e8ce" ON "historical_volume" ("timestamp") `);
    await db.query(`CREATE INDEX "IDX_ca07f342191d5f8d2ddbdd17f4" ON "historical_volume" ("asset_id") `);
    await db.query(`CREATE INDEX "IDX_8f3b74d103c87e237abfe14fe2" ON "historical_volume" ("pool_id") `);
    await db.query(
      `CREATE TABLE "current_locked_value" ("id" character varying NOT NULL, "asset_id" text NOT NULL, "amount" numeric NOT NULL, "source" character varying(16) NOT NULL, "event_id" character varying, CONSTRAINT "PK_42f4240de672201fc4df1cf3d7b" PRIMARY KEY ("id"))`
    );
    await db.query(`CREATE INDEX "IDX_0c07e602cb4227de7ec82ff33a" ON "current_locked_value" ("event_id") `);
    await db.query(
      `CREATE UNIQUE INDEX "IDX_db4dedc6da2eb4a95fafe42ce0" ON "current_locked_value" ("asset_id", "source") `
    );
    await db.query(
      `ALTER TABLE "pablo_pool_asset" ADD CONSTRAINT "FK_7fd4cdb45620476d1de745a2658" FOREIGN KEY ("pool_id") REFERENCES "pablo_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "pablo_asset_weight" ADD CONSTRAINT "FK_956be1c3085c6b2256333aca78d" FOREIGN KEY ("pool_id") REFERENCES "pablo_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_c2c1e9fdda754a6bf7f664d7e04" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "pablo_fee" ADD CONSTRAINT "FK_f021dfa4e9b4259d736c62d3228" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "pablo_fee" ADD CONSTRAINT "FK_ea38fdb5b539714d71d9375e5c3" FOREIGN KEY ("pool_id") REFERENCES "pablo_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "pablo_swap" ADD CONSTRAINT "FK_67ce5c4413b9099e2519d70fe5e" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "pablo_swap" ADD CONSTRAINT "FK_f6026f4c1626dc7e3e119c97c8e" FOREIGN KEY ("pool_id") REFERENCES "pablo_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "pablo_swap" ADD CONSTRAINT "FK_43529b9c0dc0c5c73ad22ffc61e" FOREIGN KEY ("fee_id") REFERENCES "pablo_fee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "pablo_liquidity_added" ADD CONSTRAINT "FK_bafde96a7f97a136193c5aac2e1" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "pablo_liquidity_added" ADD CONSTRAINT "FK_a057af366fd184a7c71fd19e348" FOREIGN KEY ("pool_id") REFERENCES "pablo_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "pablo_liquidity_removed" ADD CONSTRAINT "FK_99cd30a53612c12da96ba255f96" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "pablo_liquidity_removed" ADD CONSTRAINT "FK_cc8c8c14f2ee44a3c73e18fd9b3" FOREIGN KEY ("pool_id") REFERENCES "pablo_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "pablo_transaction" ADD CONSTRAINT "FK_969a927080f5b6c81b79b40cd86" FOREIGN KEY ("pool_id") REFERENCES "pablo_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "pablo_transaction" ADD CONSTRAINT "FK_0118a010cf1571fc5cb70b90a73" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "pablo_transaction" ADD CONSTRAINT "FK_efc2b9a858fe9c1b2fce95b7440" FOREIGN KEY ("swap_id") REFERENCES "pablo_swap"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "pablo_transaction" ADD CONSTRAINT "FK_a75c0addf49ff4854cd1d391ac7" FOREIGN KEY ("liquidity_added_id") REFERENCES "pablo_liquidity_added"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "pablo_transaction" ADD CONSTRAINT "FK_8581db5407f7bcc89bbb90769f9" FOREIGN KEY ("liquidity_removed_id") REFERENCES "pablo_liquidity_removed"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "historical_asset_price" ADD CONSTRAINT "FK_e5b6c7a8a991d63c9670391daaf" FOREIGN KEY ("asset_id") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "staking_position" ADD CONSTRAINT "FK_3e2e1b465d89dbb2736e70fe5f1" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "historical_locked_value" ADD CONSTRAINT "FK_e16f52796ccae0d99cb8d6e4040" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "historical_volume" ADD CONSTRAINT "FK_eceb392fe7bbe48cb21e1d8b5a5" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "historical_volume" ADD CONSTRAINT "FK_8f3b74d103c87e237abfe14fe2d" FOREIGN KEY ("pool_id") REFERENCES "pablo_pool"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await db.query(
      `ALTER TABLE "current_locked_value" ADD CONSTRAINT "FK_0c07e602cb4227de7ec82ff33a7" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  async down(db) {
    await db.query(`DROP TABLE "account"`);
    await db.query(`DROP TABLE "pablo_pool_asset"`);
    await db.query(`DROP INDEX "public"."IDX_7fd4cdb45620476d1de745a265"`);
    await db.query(`DROP TABLE "pablo_asset_weight"`);
    await db.query(`DROP INDEX "public"."IDX_956be1c3085c6b2256333aca78"`);
    await db.query(`DROP INDEX "public"."IDX_986c61507f2b090b168939c3ba"`);
    await db.query(`DROP TABLE "pablo_pool"`);
    await db.query(`DROP INDEX "public"."IDX_76686140a45d0a11fadadc16f6"`);
    await db.query(`DROP INDEX "public"."IDX_c5772b79e56d97f7eee239ba9e"`);
    await db.query(`DROP TABLE "activity"`);
    await db.query(`DROP INDEX "public"."IDX_c2c1e9fdda754a6bf7f664d7e0"`);
    await db.query(`DROP INDEX "public"."IDX_96c7c848eec1feba0bc66b4519"`);
    await db.query(`DROP INDEX "public"."IDX_1ed07d94b85322141135c8de3e"`);
    await db.query(`DROP TABLE "event"`);
    await db.query(`DROP INDEX "public"."IDX_77b76886d64fa0304db94dd4d9"`);
    await db.query(`DROP INDEX "public"."IDX_a8a7fbbbb0d8305cd81eda6ac8"`);
    await db.query(`DROP INDEX "public"."IDX_2c15918ff289396205521c5f3c"`);
    await db.query(`DROP TABLE "pablo_fee"`);
    await db.query(`DROP INDEX "public"."IDX_f021dfa4e9b4259d736c62d322"`);
    await db.query(`DROP INDEX "public"."IDX_ea38fdb5b539714d71d9375e5c"`);
    await db.query(`DROP INDEX "public"."IDX_03c50b6e6cf75fee46d497c781"`);
    await db.query(`DROP INDEX "public"."IDX_d827606a2b1456629fc123e175"`);
    await db.query(`DROP INDEX "public"."IDX_3d0ff85f15733b3586eb990807"`);
    await db.query(`DROP TABLE "pablo_swap"`);
    await db.query(`DROP INDEX "public"."IDX_67ce5c4413b9099e2519d70fe5"`);
    await db.query(`DROP INDEX "public"."IDX_f6026f4c1626dc7e3e119c97c8"`);
    await db.query(`DROP INDEX "public"."IDX_c8f54ece4041badf1a7a38f79e"`);
    await db.query(`DROP INDEX "public"."IDX_e1cf205ce04bf33f31197245df"`);
    await db.query(`DROP INDEX "public"."IDX_43529b9c0dc0c5c73ad22ffc61"`);
    await db.query(`DROP INDEX "public"."IDX_f6217e443e7644ba555a75b989"`);
    await db.query(`DROP TABLE "pablo_liquidity_added"`);
    await db.query(`DROP INDEX "public"."IDX_bafde96a7f97a136193c5aac2e"`);
    await db.query(`DROP INDEX "public"."IDX_a057af366fd184a7c71fd19e34"`);
    await db.query(`DROP INDEX "public"."IDX_12052a331774a4ef713e00c4af"`);
    await db.query(`DROP TABLE "pablo_liquidity_removed"`);
    await db.query(`DROP INDEX "public"."IDX_99cd30a53612c12da96ba255f9"`);
    await db.query(`DROP INDEX "public"."IDX_cc8c8c14f2ee44a3c73e18fd9b"`);
    await db.query(`DROP INDEX "public"."IDX_b823763f594c476d25eb851bb6"`);
    await db.query(`DROP TABLE "pablo_transaction"`);
    await db.query(`DROP INDEX "public"."IDX_969a927080f5b6c81b79b40cd8"`);
    await db.query(`DROP INDEX "public"."IDX_126f5e07c560f23355c16a3f27"`);
    await db.query(`DROP INDEX "public"."IDX_521c4ea4ac07c98f74d2a70423"`);
    await db.query(`DROP INDEX "public"."IDX_0118a010cf1571fc5cb70b90a7"`);
    await db.query(`DROP INDEX "public"."IDX_efc2b9a858fe9c1b2fce95b744"`);
    await db.query(`DROP INDEX "public"."IDX_a75c0addf49ff4854cd1d391ac"`);
    await db.query(`DROP INDEX "public"."IDX_8581db5407f7bcc89bbb90769f"`);
    await db.query(`DROP TABLE "bonded_finance_bond_offer"`);
    await db.query(`DROP INDEX "public"."IDX_932377f288f9b8ae200c9ed313"`);
    await db.query(`DROP INDEX "public"."IDX_733dd0609e90b935c61877da93"`);
    await db.query(`DROP TABLE "vesting_schedule"`);
    await db.query(`DROP INDEX "public"."IDX_1f8cb2fc5b3d42fcd5bacfe8bc"`);
    await db.query(`DROP INDEX "public"."IDX_2470998bd5d66304c8ff329e84"`);
    await db.query(`DROP INDEX "public"."IDX_020d628167fb6a0158d25abf5e"`);
    await db.query(`DROP TABLE "historical_asset_price"`);
    await db.query(`DROP INDEX "public"."IDX_754559c3337480cf2b30d157b2"`);
    await db.query(`DROP INDEX "public"."IDX_e5b6c7a8a991d63c9670391daa"`);
    await db.query(`DROP INDEX "public"."IDX_25fff2ead369948d7e8aa4ab23"`);
    await db.query(`DROP TABLE "asset"`);
    await db.query(`DROP INDEX "public"."IDX_3d0534c2bb8faaf00628625ad2"`);
    await db.query(`DROP TABLE "reward_pool"`);
    await db.query(`DROP INDEX "public"."IDX_863db0d97cf58a3f045eddaca4"`);
    await db.query(`DROP INDEX "public"."IDX_a2320054a632a80a4c6be32a3d"`);
    await db.query(`DROP TABLE "staking_position"`);
    await db.query(`DROP INDEX "public"."IDX_3e2e1b465d89dbb2736e70fe5f"`);
    await db.query(`DROP INDEX "public"."IDX_71ba8ca256d4cc74b9440bf2ac"`);
    await db.query(`DROP INDEX "public"."IDX_e94373a6b771b4edcaca7950bc"`);
    await db.query(`DROP INDEX "public"."IDX_69e08176f6778a2a276720109d"`);
    await db.query(`DROP TABLE "historical_locked_value"`);
    await db.query(`DROP INDEX "public"."IDX_e16f52796ccae0d99cb8d6e404"`);
    await db.query(`DROP INDEX "public"."IDX_57be1b98925b8ed2c98e4c6124"`);
    await db.query(`DROP INDEX "public"."IDX_476e4f27f23b927c12b40c17ce"`);
    await db.query(`DROP INDEX "public"."IDX_7ee4ac4392690114171a6ddc25"`);
    await db.query(`DROP TABLE "historical_volume"`);
    await db.query(`DROP INDEX "public"."IDX_eceb392fe7bbe48cb21e1d8b5a"`);
    await db.query(`DROP INDEX "public"."IDX_e6fa17aa4250e438cb6286e8ce"`);
    await db.query(`DROP INDEX "public"."IDX_ca07f342191d5f8d2ddbdd17f4"`);
    await db.query(`DROP INDEX "public"."IDX_8f3b74d103c87e237abfe14fe2"`);
    await db.query(`DROP TABLE "current_locked_value"`);
    await db.query(`DROP INDEX "public"."IDX_0c07e602cb4227de7ec82ff33a"`);
    await db.query(`DROP INDEX "public"."IDX_db4dedc6da2eb4a95fafe42ce0"`);
    await db.query(`ALTER TABLE "pablo_pool_asset" DROP CONSTRAINT "FK_7fd4cdb45620476d1de745a2658"`);
    await db.query(`ALTER TABLE "pablo_asset_weight" DROP CONSTRAINT "FK_956be1c3085c6b2256333aca78d"`);
    await db.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_c2c1e9fdda754a6bf7f664d7e04"`);
    await db.query(`ALTER TABLE "pablo_fee" DROP CONSTRAINT "FK_f021dfa4e9b4259d736c62d3228"`);
    await db.query(`ALTER TABLE "pablo_fee" DROP CONSTRAINT "FK_ea38fdb5b539714d71d9375e5c3"`);
    await db.query(`ALTER TABLE "pablo_swap" DROP CONSTRAINT "FK_67ce5c4413b9099e2519d70fe5e"`);
    await db.query(`ALTER TABLE "pablo_swap" DROP CONSTRAINT "FK_f6026f4c1626dc7e3e119c97c8e"`);
    await db.query(`ALTER TABLE "pablo_swap" DROP CONSTRAINT "FK_43529b9c0dc0c5c73ad22ffc61e"`);
    await db.query(`ALTER TABLE "pablo_liquidity_added" DROP CONSTRAINT "FK_bafde96a7f97a136193c5aac2e1"`);
    await db.query(`ALTER TABLE "pablo_liquidity_added" DROP CONSTRAINT "FK_a057af366fd184a7c71fd19e348"`);
    await db.query(`ALTER TABLE "pablo_liquidity_removed" DROP CONSTRAINT "FK_99cd30a53612c12da96ba255f96"`);
    await db.query(`ALTER TABLE "pablo_liquidity_removed" DROP CONSTRAINT "FK_cc8c8c14f2ee44a3c73e18fd9b3"`);
    await db.query(`ALTER TABLE "pablo_transaction" DROP CONSTRAINT "FK_969a927080f5b6c81b79b40cd86"`);
    await db.query(`ALTER TABLE "pablo_transaction" DROP CONSTRAINT "FK_0118a010cf1571fc5cb70b90a73"`);
    await db.query(`ALTER TABLE "pablo_transaction" DROP CONSTRAINT "FK_efc2b9a858fe9c1b2fce95b7440"`);
    await db.query(`ALTER TABLE "pablo_transaction" DROP CONSTRAINT "FK_a75c0addf49ff4854cd1d391ac7"`);
    await db.query(`ALTER TABLE "pablo_transaction" DROP CONSTRAINT "FK_8581db5407f7bcc89bbb90769f9"`);
    await db.query(`ALTER TABLE "historical_asset_price" DROP CONSTRAINT "FK_e5b6c7a8a991d63c9670391daaf"`);
    await db.query(`ALTER TABLE "staking_position" DROP CONSTRAINT "FK_3e2e1b465d89dbb2736e70fe5f1"`);
    await db.query(`ALTER TABLE "historical_locked_value" DROP CONSTRAINT "FK_e16f52796ccae0d99cb8d6e4040"`);
    await db.query(`ALTER TABLE "historical_volume" DROP CONSTRAINT "FK_eceb392fe7bbe48cb21e1d8b5a5"`);
    await db.query(`ALTER TABLE "historical_volume" DROP CONSTRAINT "FK_8f3b74d103c87e237abfe14fe2d"`);
    await db.query(`ALTER TABLE "current_locked_value" DROP CONSTRAINT "FK_0c07e602cb4227de7ec82ff33a7"`);
  }
};
