<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            "01" => "Nature",
            "02" => "Lifestyle",
            "03" => "Artical",
            "04" => "Fashion",
            "05" => "Philosophy",
            "06" => "Digital",
            "07" => "Sports",
        ];

        foreach ($categories as $key => $category) {
            Category::create(['name' => $category, 'image' => "cat-$key.jpg"]);
        }
    }
}
