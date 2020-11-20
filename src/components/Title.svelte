<h1>
    <span class="sudoku">Sudoku</span>
    <span class="trainer">trainer</span>
</h1>

<style>
    h1 {
        display: flex;
        flex-direction: column;
        font-size: 2rem;
        line-height: .75;
        margin: 0;
    }

    .sudoku {
        text-transform: uppercase;
        color: #ff3e00;
        font-weight: 100;
    }

    .trainer {
        font-variant: small-caps;
        color: #333;
        margin-left: 3rem;
        font-weight: 200;
    }

    @media screen and (max-width: 30rem) {
        h1 {
            margin: .5rem;
            font-size: 1rem;
        }

        .trainer {
            margin-left: 2rem;
        }
    }
</style>
