
//! Autogenerated weights for `identity`
//!
//! THIS FILE WAS AUTO-GENERATED USING THE SUBSTRATE BENCHMARK CLI VERSION 4.0.0-dev
//! DATE: 2023-02-14, STEPS: `50`, REPEAT: 10, LOW RANGE: `[]`, HIGH RANGE: `[]`
//! HOSTNAME: `ddf18ea9c649`, CPU: `Intel(R) Xeon(R) CPU @ 3.10GHz`
//! EXECUTION: Some(Wasm), WASM-EXECUTION: Compiled, CHAIN: Some("dali-dev"), DB CACHE: 1024

// Executed Command:
// /nix/store/7as5b27dws6pfhhpjrs68qfvfx2ldcli-composable/bin/composable
// benchmark
// pallet
// --chain=dali-dev
// --execution=wasm
// --wasm-execution=compiled
// --pallet=*
// --extrinsic=*
// --steps=50
// --repeat=10
// --output=code/parachain/runtime/dali/src/weights

#![cfg_attr(rustfmt, rustfmt_skip)]
#![allow(unused_parens)]
#![allow(unused_imports)]

use frame_support::{traits::Get, weights::Weight};
use sp_std::marker::PhantomData;

/// Weight functions for `identity`.
pub struct WeightInfo<T>(PhantomData<T>);
impl<T: frame_system::Config> identity::WeightInfo for WeightInfo<T> {
	// Storage: Identity Registrars (r:1 w:1)
	/// The range of component `r` is `[1, 7]`.
	fn add_registrar(r: u32, ) -> Weight {
		// Minimum execution time: 29_817 nanoseconds.
		Weight::from_ref_time(30_620_060)
			// Standard Error: 22_153
			.saturating_add(Weight::from_ref_time(687_304).saturating_mul(r.into()))
			.saturating_add(T::DbWeight::get().reads(1))
			.saturating_add(T::DbWeight::get().writes(1))
	}
	// Storage: Identity IdentityOf (r:1 w:1)
	/// The range of component `r` is `[1, 8]`.
	/// The range of component `x` is `[0, 32]`.
	fn set_identity(r: u32, x: u32, ) -> Weight {
		// Minimum execution time: 46_654 nanoseconds.
		Weight::from_ref_time(61_583_270)
			// Standard Error: 87_408
			.saturating_add(Weight::from_ref_time(822_465).saturating_mul(r.into()))
			// Standard Error: 20_045
			.saturating_add(Weight::from_ref_time(806_169).saturating_mul(x.into()))
			.saturating_add(T::DbWeight::get().reads(1))
			.saturating_add(T::DbWeight::get().writes(1))
	}
	// Storage: Identity IdentityOf (r:1 w:0)
	// Storage: Identity SubsOf (r:1 w:1)
	// Storage: Identity SuperOf (r:1 w:1)
	/// The range of component `s` is `[0, 32]`.
	fn set_subs_new(s: u32, ) -> Weight {
		// Minimum execution time: 18_409 nanoseconds.
		Weight::from_ref_time(46_558_314)
			// Standard Error: 39_542
			.saturating_add(Weight::from_ref_time(5_021_897).saturating_mul(s.into()))
			.saturating_add(T::DbWeight::get().reads(2))
			.saturating_add(T::DbWeight::get().reads((1_u64).saturating_mul(s.into())))
			.saturating_add(T::DbWeight::get().writes(1))
			.saturating_add(T::DbWeight::get().writes((1_u64).saturating_mul(s.into())))
	}
	// Storage: Identity IdentityOf (r:1 w:0)
	// Storage: Identity SubsOf (r:1 w:1)
	// Storage: Identity SuperOf (r:0 w:1)
	/// The range of component `p` is `[0, 32]`.
	fn set_subs_old(p: u32, ) -> Weight {
		// Minimum execution time: 18_486 nanoseconds.
		Weight::from_ref_time(47_656_425)
			// Standard Error: 40_138
			.saturating_add(Weight::from_ref_time(2_261_915).saturating_mul(p.into()))
			.saturating_add(T::DbWeight::get().reads(2))
			.saturating_add(T::DbWeight::get().writes(1))
			.saturating_add(T::DbWeight::get().writes((1_u64).saturating_mul(p.into())))
	}
	// Storage: Identity SubsOf (r:1 w:1)
	// Storage: Identity IdentityOf (r:1 w:1)
	// Storage: Identity SuperOf (r:0 w:32)
	/// The range of component `r` is `[1, 8]`.
	/// The range of component `s` is `[0, 32]`.
	/// The range of component `x` is `[0, 32]`.
	fn clear_identity(r: u32, s: u32, x: u32, ) -> Weight {
		// Minimum execution time: 73_338 nanoseconds.
		Weight::from_ref_time(58_768_352)
			// Standard Error: 50_137
			.saturating_add(Weight::from_ref_time(775_693).saturating_mul(r.into()))
			// Standard Error: 11_505
			.saturating_add(Weight::from_ref_time(2_061_933).saturating_mul(s.into()))
			// Standard Error: 11_505
			.saturating_add(Weight::from_ref_time(467_811).saturating_mul(x.into()))
			.saturating_add(T::DbWeight::get().reads(2))
			.saturating_add(T::DbWeight::get().writes(2))
			.saturating_add(T::DbWeight::get().writes((1_u64).saturating_mul(s.into())))
	}
	// Storage: Identity Registrars (r:1 w:0)
	// Storage: Identity IdentityOf (r:1 w:1)
	/// The range of component `r` is `[1, 8]`.
	/// The range of component `x` is `[0, 32]`.
	fn request_judgement(r: u32, x: u32, ) -> Weight {
		// Minimum execution time: 65_773 nanoseconds.
		Weight::from_ref_time(63_632_982)
			// Standard Error: 41_148
			.saturating_add(Weight::from_ref_time(625_170).saturating_mul(r.into()))
			// Standard Error: 9_436
			.saturating_add(Weight::from_ref_time(816_036).saturating_mul(x.into()))
			.saturating_add(T::DbWeight::get().reads(2))
			.saturating_add(T::DbWeight::get().writes(1))
	}
	// Storage: Identity IdentityOf (r:1 w:1)
	/// The range of component `r` is `[1, 8]`.
	/// The range of component `x` is `[0, 32]`.
	fn cancel_request(r: u32, x: u32, ) -> Weight {
		// Minimum execution time: 59_529 nanoseconds.
		Weight::from_ref_time(59_870_613)
			// Standard Error: 32_285
			.saturating_add(Weight::from_ref_time(320_403).saturating_mul(r.into()))
			// Standard Error: 7_404
			.saturating_add(Weight::from_ref_time(813_771).saturating_mul(x.into()))
			.saturating_add(T::DbWeight::get().reads(1))
			.saturating_add(T::DbWeight::get().writes(1))
	}
	// Storage: Identity Registrars (r:1 w:1)
	/// The range of component `r` is `[1, 7]`.
	fn set_fee(r: u32, ) -> Weight {
		// Minimum execution time: 15_811 nanoseconds.
		Weight::from_ref_time(16_085_500)
			// Standard Error: 11_166
			.saturating_add(Weight::from_ref_time(564_113).saturating_mul(r.into()))
			.saturating_add(T::DbWeight::get().reads(1))
			.saturating_add(T::DbWeight::get().writes(1))
	}
	// Storage: Identity Registrars (r:1 w:1)
	/// The range of component `r` is `[1, 7]`.
	fn set_account_id(r: u32, ) -> Weight {
		// Minimum execution time: 16_241 nanoseconds.
		Weight::from_ref_time(16_589_676)
			// Standard Error: 11_964
			.saturating_add(Weight::from_ref_time(560_038).saturating_mul(r.into()))
			.saturating_add(T::DbWeight::get().reads(1))
			.saturating_add(T::DbWeight::get().writes(1))
	}
	// Storage: Identity Registrars (r:1 w:1)
	/// The range of component `r` is `[1, 7]`.
	fn set_fields(r: u32, ) -> Weight {
		// Minimum execution time: 15_893 nanoseconds.
		Weight::from_ref_time(16_294_213)
			// Standard Error: 14_296
			.saturating_add(Weight::from_ref_time(546_006).saturating_mul(r.into()))
			.saturating_add(T::DbWeight::get().reads(1))
			.saturating_add(T::DbWeight::get().writes(1))
	}
	// Storage: Identity Registrars (r:1 w:0)
	// Storage: Identity IdentityOf (r:1 w:1)
	/// The range of component `r` is `[1, 7]`.
	/// The range of component `x` is `[0, 32]`.
	fn provide_judgement(r: u32, x: u32, ) -> Weight {
		// Minimum execution time: 47_918 nanoseconds.
		Weight::from_ref_time(48_452_701)
			// Standard Error: 40_809
			.saturating_add(Weight::from_ref_time(335_088).saturating_mul(r.into()))
			// Standard Error: 8_219
			.saturating_add(Weight::from_ref_time(1_298_275).saturating_mul(x.into()))
			.saturating_add(T::DbWeight::get().reads(2))
			.saturating_add(T::DbWeight::get().writes(1))
	}
	// Storage: Identity SubsOf (r:1 w:1)
	// Storage: Identity IdentityOf (r:1 w:1)
	// Storage: System Account (r:2 w:2)
	// Storage: Identity SuperOf (r:0 w:32)
	/// The range of component `r` is `[1, 8]`.
	/// The range of component `s` is `[0, 32]`.
	/// The range of component `x` is `[0, 32]`.
	fn kill_identity(r: u32, s: u32, x: u32, ) -> Weight {
		// Minimum execution time: 93_239 nanoseconds.
		Weight::from_ref_time(81_706_432)
			// Standard Error: 49_379
			.saturating_add(Weight::from_ref_time(547_700).saturating_mul(r.into()))
			// Standard Error: 11_331
			.saturating_add(Weight::from_ref_time(2_051_120).saturating_mul(s.into()))
			// Standard Error: 11_331
			.saturating_add(Weight::from_ref_time(448_333).saturating_mul(x.into()))
			.saturating_add(T::DbWeight::get().reads(4))
			.saturating_add(T::DbWeight::get().writes(4))
			.saturating_add(T::DbWeight::get().writes((1_u64).saturating_mul(s.into())))
	}
	// Storage: Identity IdentityOf (r:1 w:0)
	// Storage: Identity SuperOf (r:1 w:1)
	// Storage: Identity SubsOf (r:1 w:1)
	/// The range of component `s` is `[0, 31]`.
	fn add_sub(s: u32, ) -> Weight {
		// Minimum execution time: 57_796 nanoseconds.
		Weight::from_ref_time(64_067_366)
			// Standard Error: 13_926
			.saturating_add(Weight::from_ref_time(404_152).saturating_mul(s.into()))
			.saturating_add(T::DbWeight::get().reads(3))
			.saturating_add(T::DbWeight::get().writes(2))
	}
	// Storage: Identity IdentityOf (r:1 w:0)
	// Storage: Identity SuperOf (r:1 w:1)
	/// The range of component `s` is `[1, 32]`.
	fn rename_sub(s: u32, ) -> Weight {
		// Minimum execution time: 23_790 nanoseconds.
		Weight::from_ref_time(25_861_942)
			// Standard Error: 7_453
			.saturating_add(Weight::from_ref_time(198_945).saturating_mul(s.into()))
			.saturating_add(T::DbWeight::get().reads(2))
			.saturating_add(T::DbWeight::get().writes(1))
	}
	// Storage: Identity IdentityOf (r:1 w:0)
	// Storage: Identity SuperOf (r:1 w:1)
	// Storage: Identity SubsOf (r:1 w:1)
	/// The range of component `s` is `[1, 32]`.
	fn remove_sub(s: u32, ) -> Weight {
		// Minimum execution time: 63_300 nanoseconds.
		Weight::from_ref_time(66_683_286)
			// Standard Error: 14_665
			.saturating_add(Weight::from_ref_time(380_370).saturating_mul(s.into()))
			.saturating_add(T::DbWeight::get().reads(3))
			.saturating_add(T::DbWeight::get().writes(2))
	}
	// Storage: Identity SuperOf (r:1 w:1)
	// Storage: Identity SubsOf (r:1 w:1)
	/// The range of component `s` is `[0, 31]`.
	fn quit_sub(s: u32, ) -> Weight {
		// Minimum execution time: 44_561 nanoseconds.
		Weight::from_ref_time(46_906_775)
			// Standard Error: 9_842
			.saturating_add(Weight::from_ref_time(362_054).saturating_mul(s.into()))
			.saturating_add(T::DbWeight::get().reads(2))
			.saturating_add(T::DbWeight::get().writes(2))
	}
}
