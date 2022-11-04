 <template>
    <router-link :to="redirecTo">
        <button 
            class="
                m-3
                px-4
                py-1 
                rounded-md 
                shadow-sm 
                outline 
                outline-zinic800 
                hover:bg-orange400 
                hover:text-white 
                text-lg 
                font-medium
        ">
            <slot></slot>
        </button>
    </router-link>
</template>
<script>
export default {
    name: "OutlineBtn",
    props: {
        redirecTo: {
            type: String
        }
    }
}
</script>